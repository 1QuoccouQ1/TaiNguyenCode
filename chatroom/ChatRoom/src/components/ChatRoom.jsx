import  { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Kết nối đến server backend

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Lắng nghe sự kiện nhận tin nhắn từ server
    socket.on("receive_message", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    // Cleanup
    return () => socket.off("receive_message");
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("send_message", message); // Gửi tin nhắn lên server
      setMessages((prev) => [...prev, `You: ${message}`]);
      setMessage(""); // Xóa input
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Realtime Chat</h2>
      <div
        style={{
          border: "1px solid #ccc",
          height: "300px",
          overflowY: "scroll",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        style={{ width: "80%", padding: "10px" }}
      />
      <button onClick={sendMessage} style={{ padding: "10px" }}>
        Send
      </button>
    </div>
  );
}

export default ChatRoom;
