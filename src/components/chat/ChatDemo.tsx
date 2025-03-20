import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { MessageSquare } from "lucide-react"

const messages = [
  {
    id: 1,
    sender: "Alice",
    content: {
      uz: "Salom, qalaysiz?",
      ru: "Привет, как дела?",
    },
    isUser: false,
    timestamp: "10:05 AM",
  },
  {
    id: 2,
    sender: "You",
    content: {
      uz: "Yaxshi, rahmat! Siz-chi?",
      ru: "Хорошо, спасибо! А вы?",
    },
    isUser: true,
    timestamp: "10:06 AM",
  },
  {
    id: 3,
    sender: "Alice",
    content: {
      uz: "Men ham yaxshiman. Bugun nima qilmoqchisiz?",
      ru: "У меня тоже все хорошо. Что планируете делать сегодня?",
    },
    isUser: false,
    timestamp: "10:07 AM",
  },
  {
    id: 4,
    sender: "You",
    content: {
      uz: "Men kitob o'qimoqchiman va do'stlarim bilan uchrashmoqchiman.",
      ru: "Я хочу почитать книгу и встретиться с друзьями.",
    },
    isUser: true,
    timestamp: "10:09 AM",
  },
  {
    id: 5,
    sender: "Alice",
    content: {
      uz: "Juda yaxshi! Qanday kitob o'qimoqchisiz?",
      ru: "Отлично! Какую книгу вы хотите прочитать?",
    },
    isUser: false,
    timestamp: "10:10 AM",
  },
]

export default function ChatDemo() {
  const [language, setLanguage] = useState<"uz" | "ru">("uz")

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "uz" ? "ru" : "uz"))
  }

  return (
      <Card className="w-full max-w-xl">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Chat Demo
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="language-toggle" className="text-sm">
                {language === "uz" ? "Uzbek" : "Russian"}
              </Label>
              <Switch id="language-toggle" checked={language === "ru"} onCheckedChange={toggleLanguage} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 h-[60vh] overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {!message.isUser && <div className="font-semibold mb-1">{message.sender}</div>}
                  <div>{message.content[language]}</div>
                  <div className="text-xs opacity-70 mt-1 text-right">{message.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t p-3">
          <div className="w-full flex items-center gap-2">
            <input
              type="text"
              placeholder={language === "uz" ? "Xabar yozing..." : "Напишите сообщение..."}
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button size="sm" disabled>
              {language === "uz" ? "Yuborish" : "Отправить"}
            </Button>
          </div>
        </CardFooter>
      </Card>
  )
}

