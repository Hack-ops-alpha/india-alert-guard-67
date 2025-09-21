import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Loader2, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface AIChatbotProps {
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

const AIChatbot: React.FC<AIChatbotProps> = ({ isMinimized, onToggleMinimize }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your Beacon AI assistant. I can help you with disaster preparedness questions, emergency protocols, and safety information. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const callGeminiAPI = async (message: string): Promise<string> => {
    if (!apiKey) {
      throw new Error('API key not provided');
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are Beacon AI, a disaster preparedness assistant for India. Focus on providing helpful information about:
- Natural disasters common in India (earthquakes, floods, cyclones, heatwaves)
- Emergency preparedness and safety protocols
- First aid and emergency response
- Disaster risk reduction
- Safety tips for different scenarios

User question: ${message}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topP: 0.8,
            topK: 40,
            maxOutputTokens: 1000,
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Gemini API key to use the AI assistant.",
        variant: "destructive"
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botResponse = await callGeminiAPI(userMessage.content);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I apologize, but I\'m having trouble connecting right now. Please check your API key or try again later.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Failed to get AI response. Please check your API key.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeySubmit = () => {
    localStorage.setItem('gemini_api_key', apiKey);
    toast({
      title: "API Key Saved",
      description: "Your Gemini API key has been saved locally.",
    });
  };

  if (isMinimized) {
    return (
      <Card className="fixed bottom-4 right-4 w-16 h-16 cursor-pointer shadow-lg border-primary/20" onClick={onToggleMinimize}>
        <CardContent className="p-0 flex items-center justify-center h-full">
          <Bot className="h-8 w-8 text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[500px] shadow-xl border-primary/20 z-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Beacon AI</CardTitle>
            <Badge variant="secondary" className="text-xs">Beta</Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleMinimize}
            className="h-8 w-8 p-0"
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
        </div>
        
        {!apiKey && (
          <div className="space-y-2">
            <Input
              placeholder="Enter Gemini API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              type="password"
              className="text-sm"
            />
            <Button onClick={handleApiKeySubmit} size="sm" className="w-full">
              Save API Key
            </Button>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="p-0 flex flex-col h-[calc(100%-120px)]">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' ? 'bg-primary' : 'bg-secondary'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 text-primary-foreground" />
                    ) : (
                      <Bot className="h-4 w-4 text-secondary-foreground" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex space-x-2 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Bot className="h-4 w-4 text-secondary-foreground" />
                  </div>
                  <div className="rounded-lg p-3 bg-secondary">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              placeholder="Ask about disaster preparedness..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading || !apiKey}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim() || !apiKey}
              size="sm"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatbot;