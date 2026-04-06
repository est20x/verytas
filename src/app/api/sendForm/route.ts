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
☎️ Телефон: ${phone}

👇 Ответы на вопросы:

${userAnswersText}
    `;

    // ✅ Відправка в Telegram
    const token = "8702313207:AAF5syokhG1D_8s2mX117z600j_hZi53DfU";
    const chat_id = "-1003821809756";
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
    const googleScriptUrl = "";
// https://script.google.com/macros/s/AKfycbzKstlTcGD0NvGvLxRysKTn9MPsuaIv5imlObXXLZWRu5RbvxqM_s5chZrk7ue-0LM/exec
    const sheetRes = await fetch(googleScriptUrl, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        whatsapp: phone,
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
