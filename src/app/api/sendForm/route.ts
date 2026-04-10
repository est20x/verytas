import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { name, email, phone, answers } = formData;

    if (!name || !phone || !answers || answers.length === 0) {
      return NextResponse.json({ error: "Все поля должны быть заполнены!" }, { status: 400 });
    }

    // ✅ Формуємо текст для Telegram
    const userAnswersText = answers
      .map((answer: { question: string; option: string }, index: number) => {
        return `${index + 1}. ${answer.question}\nОтвет: ${answer.option}`;
      })
      .join("\n\n");

    const message = `
🇪🇺 Имя: ${name}
📧 Email: ${email}
☎️ Телефон: ${phone}

👇 Ответы на вопросы:

${userAnswersText}
    `;

    // ✅ Відправка в Telegram
    const token = "8748099842:AAGBP48aAP4RGuT1M5dWwEgFMZQJ53chW1k";
    const chat_id = "-1003854387081";

    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(
      message
    )}`;

    const telegramRes = await fetch(telegramUrl);
    if (!telegramRes.ok) {
      throw new Error("Не удалось отправить сообщение в Telegram");
    }

    // ✅ Формуємо масив відповідей для Google Таблиці
    const answersArray = answers.map(
      (answer: { question: string; option: string }) => answer.option
    );

    // ✅ Відправка в Google Таблицю
    // 👇 Вставте URL після деплою Apps Script (інструкція — дивіться Code.gs)
    const googleScriptUrl = "https://script.google.com/macros/s/AKfycbw_eCoJ7BlCrCqCDsFtMdxx8QhA-JdhsD9Hcm9JGAuTVrbYTDvXJvO-SgKHk1V2QUV3/exec";

    const sheetRes = await fetch(googleScriptUrl, {
      method: "POST",
      body: JSON.stringify({
        name,
        phone,
        answers: answersArray,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const sheetText = await sheetRes.text();
    console.log("Google Sheet response:", sheetText);

    return NextResponse.json({ message: "Форма успешно отправлена!" });
  } catch (error) {
    console.error("Ошибка при отправке формы:", error);
    return NextResponse.json(
      { error: "Ошибка при отправке формы" },
      { status: 500 }
    );
  }
}
