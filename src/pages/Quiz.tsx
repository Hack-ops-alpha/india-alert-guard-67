import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Clock, Trophy } from "lucide-react";

const quizData = {
  title: "Flood Preparedness Quiz",
  description: "Test your knowledge about flood safety and preparedness measures.",
  timeLimit: 300, // 5 minutes
  questions: [
    {
      id: 1,
      question: "What is the first action you should take when a flood warning is issued?",
      options: [
        "Ignore it and wait for confirmation",
        "Move to higher ground immediately",
        "Start filling sandbags",
        "Call friends and family"
      ],
      correct: 1
    },
    {
      id: 2,
      question: "Which of these items should be in your emergency flood kit?",
      options: [
        "Heavy furniture",
        "Important documents in waterproof container",
        "Large amounts of cash",
        "Electrical appliances"
      ],
      correct: 1
    },
    {
      id: 3,
      question: "During a flood, what type of water should you avoid walking through?",
      options: [
        "Clear, shallow water",
        "Any moving water",
        "Water less than ankle deep",
        "Rain water"
      ],
      correct: 1
    }
  ]
};

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quizData.timeLimit);

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    quizData.questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correct) {
        correct++;
      }
    });
    return Math.round((correct / quizData.questions.length) * 100);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              {score >= 70 ? (
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                  <Trophy className="h-8 w-8 text-success" />
                </div>
              ) : (
                <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center">
                  <XCircle className="h-8 w-8 text-warning" />
                </div>
              )}
            </div>
            <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-6">
              <div className="text-4xl font-bold text-primary mb-2">{score}%</div>
              <p className="text-muted-foreground">
                You got {Object.values(selectedAnswers).filter((answer, index) => 
                  answer === quizData.questions[index].correct).length} out of {quizData.questions.length} questions correct
              </p>
            </div>
            
            <div className="flex gap-4 justify-center">
              <Button onClick={() => window.location.reload()}>
                Retake Quiz
              </Button>
              <Button variant="outline">
                View Leaderboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = quizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">{quizData.title}</h1>
          <Badge variant="outline">
            <Clock className="h-3 w-3 mr-1" />
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Question {currentQuestion + 1} of {quizData.questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{currentQ.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedAnswers[currentQ.id]?.toString()}
            onValueChange={(value) => handleAnswerSelect(currentQ.id, parseInt(value))}
          >
            {currentQ.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        
        {currentQuestion === quizData.questions.length - 1 ? (
          <Button 
            onClick={handleSubmit}
            disabled={!selectedAnswers[currentQ.id] && selectedAnswers[currentQ.id] !== 0}
          >
            Submit Quiz
          </Button>
        ) : (
          <Button 
            onClick={() => setCurrentQuestion(prev => prev + 1)}
            disabled={!selectedAnswers[currentQ.id] && selectedAnswers[currentQ.id] !== 0}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default Quiz;