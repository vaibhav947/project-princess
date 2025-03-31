export default async (req, res) => {
    
    const compliments = [
        "You are my pretty baby 💕",
        "my CUTIE im PROUD OF YOU 👸🏻",
        "You are THE BESTESTT ♥️ 😎",
        "TU SIRF MERE HO Hmph!!😤♥️",
        "You are my HOTTTIEE 🔥🧯🚒",
        "Your eyes just make me fall in love agin and again ♥️♾️",
        "You deserve the world 🌎 ♥️",
        "You light up my world 🔦",
        "TO DRINK LOTSS OF WATERR 💦💦",
        "TO HAVE BREAKFAST🧇 LUNCH🥗 DINNER🥘 ",
        "DREAM ABOUT US BABY 👩🏻‍❤️‍👨🏻 💭",
        "You are my pretty princess 👸",
        "YOUR MY PRETTYY UNICORNNN 🦄",
        "ON a Scale Of 1 to 10, you are ♾️ ♥️♥️",
        "I LOVE YOU A LOTTTTTT ❤️",
        "TO GO SLOW AND RIDE SAFELY (Below 40🥰)",
        "TO TAKE REST AND CHILL BABE😌😴 ",
        "GIVE ME A LOTSSS OF KISSES AND HUGGs😘🫂🥰🫠😋",
        "To SEND Me APKE PYAARE PYAARE PHOTU(I MELT🫠)🥹🥰",
    ]

    const chosenCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    res.statusCode = 200
    res.json({ compliment: chosenCompliment })
  }
  
