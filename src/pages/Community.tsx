import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Reply, 
  Plus,
  Search,
  Filter,
  TrendingUp,
  Clock
} from "lucide-react";

const communityData: any[] = [];

const Community = () => {
  const [selectedTab, setSelectedTab] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Community Q&A</h1>
          <p className="text-muted-foreground">
            Ask questions, share experiences, and learn from the disaster preparedness community.
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Ask Question</span>
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search questions..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="default">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="recent" className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Recent</span>
          </TabsTrigger>
          <TabsTrigger value="trending" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Trending</span>
          </TabsTrigger>
          <TabsTrigger value="unanswered" className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Unanswered</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No questions yet</h3>
            <p className="text-muted-foreground mb-4">
              Be the first to ask a question and start building the community knowledge base.
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Ask First Question
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="trending">
          <div className="text-center py-12 text-muted-foreground">
            Trending questions will appear here based on community engagement.
          </div>
        </TabsContent>
        
        <TabsContent value="unanswered">
          <div className="text-center py-12 text-muted-foreground">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p>No unanswered questions at the moment.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;