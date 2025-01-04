import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, ThumbsUp, Flag } from "lucide-react";

interface QAItem {
  id: string;
  question: string;
  answer: string;
  votes: number;
  isAnswered: boolean;
}

export const QA = () => {
  const [questions, setQuestions] = useState<QAItem[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const { toast } = useToast();

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const question: QAItem = {
      id: Date.now().toString(),
      question: newQuestion,
      answer: "",
      votes: 0,
      isAnswered: false,
    };

    setQuestions([question, ...questions]);
    setNewQuestion("");
    
    toast({
      title: "Question submitted",
      description: "Your question has been posted successfully.",
    });
  };

  const handleAnswer = (questionId: string) => {
    if (!newAnswer.trim()) return;

    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return { ...q, answer: newAnswer, isAnswered: true };
      }
      return q;
    }));
    setNewAnswer("");

    toast({
      title: "Answer submitted",
      description: "Your answer has been posted successfully.",
    });
  };

  const handleVote = (questionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return { ...q, votes: q.votes + 1 };
      }
      return q;
    }));
  };

  const handleReport = (questionId: string) => {
    toast({
      title: "Content reported",
      description: "Thank you for helping maintain our community standards.",
      variant: "destructive",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Q&A Community</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Ask a Question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitQuestion} className="space-y-4">
            <Textarea
              placeholder="What's your question?"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="min-h-[100px]"
            />
            <Button type="submit">Submit Question</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {questions.map((q) => (
          <Card key={q.id} className="relative">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-medium text-lg mb-2">{q.question}</p>
                  {q.isAnswered && (
                    <div className="bg-gray-50 p-4 rounded-lg mt-4">
                      <p className="text-gray-700">{q.answer}</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleVote(q.id)}
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">{q.votes}</span>
                </div>
              </div>

              {!q.isAnswered && (
                <div className="mt-4">
                  <Input
                    placeholder="Write an answer..."
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    className="mb-2"
                  />
                  <Button onClick={() => handleAnswer(q.id)}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Answer
                  </Button>
                </div>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => handleReport(q.id)}
              >
                <Flag className="h-4 w-4 text-gray-400" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QA;