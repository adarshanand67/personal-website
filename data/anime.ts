/**
 * @fileoverview Anime and movie collection data with detailed metadata.
 * Contains completed and planning watchlists with descriptions, ratings, and key learnings.
 */

import { AnimeType, WatchStatus } from "@/types/definitions";

/**
 * Array of anime and movie objects with comprehensive metadata.
 * Includes watch status, ratings, descriptions, tags, and key learnings from each title.
 * 
 * @type {Array<{
 *   title: string,
 *   type: AnimeType,
 *   status: WatchStatus,
 *   seasons?: string,
 *   recommended?: boolean,
 *   image?: string,
 *   description?: string,
 *   tags?: string[],
 *   year?: string,
 *   rating?: string,
 *   keyLearnings?: string[]
 * }>}
 */
export const animeData = [
    // --- COMPLETED ---
    {
        title: "Pokémon",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-20+",
        image: "https://cdn.myanimelist.net/images/anime/1405/117456l.jpg",
        description: "Ash Ketchum's journey to become a Pokémon Master with his partner Pikachu.",
        tags: ["Adventure", "Fantasy"],
        year: "1997",
        rating: "7.5/10",
        keyLearnings: [
            "True growth comes from the journey and the bonds formed, not just the championship title.",
            "Pikachu, I choose you! The strongest bond is one built on mutual respect.",
            "Gotta catch 'em all! Perseverance in the face of an impossible task is half the battle."
        ]
    },
    {
        title: "Death Note",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/9/9453l.jpg",
        description: "A brilliant student finds a supernatural notebook that allows him to kill anyone by writing their name.",
        tags: ["Thriller", "Supernatural"],
        year: "2006",
        rating: "8.7/10",
        keyLearnings: [
            "Absolute power corrupts absolutely, even the most righteous intentions.",
            "I am Justice! The line between god and monster is paper-thin.",
            "Anonymity is a weapon, but it also isolates you from the humanity you claim to save."
        ]
    },
    {
        title: "One Punch Man",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        image: "https://cdn.myanimelist.net/images/anime/12/76049l.jpg",
        description: "The story of Saitama, a hero who can defeat any opponent with a single punch but seeks a worthy challenge.",
        tags: ["Action", "Comedy"],
        year: "2015",
        rating: "8.7/10",
        keyLearnings: [
            "The struggle to improve is what gives life meaning, not the destination of perfection.",
            "100 pushups, 100 situps, 100 squats, and a 10km run every single day!",
            "True heroism often goes unrecognized, and that's okay as long as you know your worth."
        ]
    },
    {
        title: "Haikyuu!!",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-4 + Dumpster Battle",
        recommended: true,
        image: "https://cdn.myanimelist.net/images/anime/1665/140360l.jpg",
        description: "Shoyo Hinata joins a volleyball team to overcome his short stature and reach the national championship.",
        tags: ["Sports", "Drama"],
        year: "2014",
        rating: "8.9/10",
        keyLearnings: [
            "Individual talent is limited, but a team that connects can overcome the tallest of walls.",
            "The ball hasn't touched the court yet! Never give up until the very last whistle.",
            "Connect. The role of the setter is to essentially make the spiker look like a hero."
        ]
    },
    {
        title: "Code Geass: Lelouch of the Rebellion",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        recommended: true,
        image: "https://cdn.myanimelist.net/images/anime/1032/135088l.jpg",
        description: "Lelouch Lamperouge leads a rebellion against the Holy Britannian Empire using the power of Geass.",
        tags: ["Sci-Fi", "Thriller"],
        year: "2006",
        rating: "8.7/10",
        keyLearnings: [
            "Major change requires sacrifice and the courage to take on the world's hatred.",
            "If the king doesn't move, then his subjects won't follow.",
            "A life lived without a mask is impossible, but one must never forget the face underneath."
        ]
    },
    {
        title: "Cowboy Bebop",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/4/19644l.jpg",
        description: "A futuristic sci-fi western following a group of bounty hunters on the spaceship Bebop.",
        tags: ["Sci-Fi", "Action"],
        year: "1998",
        rating: "8.9/10",
        keyLearnings: [
            "You can't run from your past forever; eventually, you have to face it.",
            "See you space cowboy... Life is but a dream.",
            "Whatever happens, happens. Carrying the weight of the past only slows you down."
        ]
    },
    {
        title: "Steins;Gate",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1 + 0",
        recommended: true,
        image: "https://cdn.myanimelist.net/images/anime/1935/127974l.jpg",
        description: "A group of friends discovers a way to send messages to the past, altering the future.",
        tags: ["Sci-Fi", "Thriller"],
        year: "2011",
        rating: "9.1/10",
        keyLearnings: [
            "The weight of a single choice can ripple across time.",
            "El Psy Kongroo. No one knows what the future holds, that's why its potential is infinite.",
            "Cherish the present, for it is the only timeline where you can truly act."
        ]
    },
    {
        title: "Mob Psycho 100",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-3",
        recommended: true,
        image: "https://cdn.myanimelist.net/images/anime/8/80356l.jpg",
        description: "A powerful psychic middle schooler wants to live a normal life.",
        tags: ["Action", "Comedy"],
        year: "2016",
        rating: "8.6/10",
        keyLearnings: [
            "Psychic powers don't make you a better person. Only kindness does.",
            "If everyone is special, maybe you can be what you want to be.",
            "It's okay to run away. You don't have to carry the weight of the world alone."
        ]
    },
    {
        title: "Jujutsu Kaisen",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2 + Movie 0",
        image: "https://cdn.myanimelist.net/images/anime/1171/109222l.jpg",
        description: "Yuji Itadori joins a secret organization of Jujutsu Sorcerers to eliminate a powerful Curse.",
        tags: ["Action", "Supernatural"],
        year: "2020",
        rating: "8.7/10",
        keyLearnings: [
            "Death is inevitable, so focus on living with no regrets.",
            "Love is the most twisted curse of all.",
            "I won't stop. Even if it means being a cog in the machine, I'll keep exorcising curses."
        ]
    },
    {
        title: "Blue Lock",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        recommended: true,
        image: "https://cdn.myanimelist.net/images/anime/1258/126929l.jpg",
        description: "Japan’s project to create the world's greatest striker through a rigorous selection process.",
        tags: ["Sports", "Thriller"],
        year: "2022",
        rating: "8.3/10",
        keyLearnings: [
            "In competitive fields, overwhelming 'egoism' is necessary to reach the top.",
            "Devour your rivals. Success is where preparation meets intense desire.",
            "Chemical reaction. Excellence happens when you force your talent to evolve against others."
        ]
    },
    {
        title: "Solo Leveling",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        recommended: true,
        image: "https://cdn.myanimelist.net/images/anime/1801/142390l.jpg",
        description: "In a world of hunters, the weakest hunter gains the ability to level up infinitely.",
        tags: ["Action", "Fantasy"],
        year: "2024",
        rating: "8.5/10",
        keyLearnings: [
            "Success is a solitary climb where one must constantly outdo their past self.",
            "Arise. Your greatest shadow is often the power you haven't yet mastered.",
            "The system uses you, but you must learn to use the system to survive."
        ]
    },
    {
        title: "Demon Slayer",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-5 + Mugen Train",
        image: "https://cdn.myanimelist.net/images/anime/1286/99889l.jpg",
        description: "Tanjiro Kamado joins the Demon Slayer Corps to avenge his family and cure his sister.",
        tags: ["Action", "Fantasy"],
        year: "2019",
        rating: "9/10",
        keyLearnings: [
            "Empathy remains a warrior's greatest strength.",
            "Set your heart ablaze. Go beyond your limits to protect others.",
            "Breathing is the source of power. Mastery of the basics leads to ultimate strength."
        ]
    },
    {
        title: "Tokyo Ghoul",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-4",
        image: "https://cdn.myanimelist.net/images/anime/1498/134443l.jpg",
        description: "A college student is transformed into a half-ghoul and must navigate a dangerous new world.",
        tags: ["Horror", "Action"],
        year: "2014",
        rating: "7.8/10",
        keyLearnings: [
            "The world isn't wrong. It's the people within it who must choose how to survive.",
            "What's 1000 minus 7?",
            "Tragedy is not the end. It's the beginning of a transformation into something new."
        ]
    },
    {
        title: "Aoashi",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1731/120871l.jpg",
        description: "A raw soccer talent from the countryside joins a prestigious youth academy in Tokyo.",
        tags: ["Sports", "Drama"],
        year: "2022",
        rating: "8.1/10",
        keyLearnings: [
            "Technical skill is useless without vision.",
            "Control the field. Soccer is about the space around the ball.",
            "Think. Don't just play; analyze the game and predict the future."
        ]
    },
    {
        title: "Chainsaw Man",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/1806/126216l.jpg",
        description: "A young man merges with a devil and hunts other devils for the Public Safety Division.",
        tags: ["Action", "Horror"],
        year: "2022",
        rating: "8.5/10",
        keyLearnings: [
            "Even the simplest desires are worth fighting for.",
            "Everyone's chasing some big dream. I just want a piece of toast.",
            "Fear is power. The more you are feared, the stronger you become."
        ]
    },
    {
        title: "Erased",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/10/77957l.jpg",
        description: "A man is sent back in time 18 years to prevent the death of his mother and classmates.",
        tags: ["Mystery", "Thriller"],
        year: "2016",
        rating: "8.5/10",
        keyLearnings: [
            "Courage is the spark that can change a tragic past.",
            "The town without me. Sometimes heroes step into the cold.",
            "Believing in someone is the strongest power you can give them."
        ]
    },
    {
        title: "Dr. Stone",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-4",
        image: "https://cdn.myanimelist.net/images/anime/1613/102576l.jpg",
        description: "Senku Ishigami uses science to rebuild civilization after humanity is petrified for thousands of years.",
        tags: ["Sci-Fi", "Adventure"],
        year: "2019",
        rating: "8.3/10",
        keyLearnings: [
            "Science is the ultimate equalizer.",
            "In a world of stone, steady progress is absolute.",
            "Passing the torch of knowledge is how humanity survives over thousands of years."
        ]
    },
    {
        title: "Vinland Saga",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-2",
        image: "https://cdn.myanimelist.net/images/anime/1500/103005l.jpg",
        description: "Thorfinn pursues a journey of revenge against the man who killed his father.",
        tags: ["Action", "Drama"],
        year: "2019",
        rating: "8.8/10",
        keyLearnings: [
            "The most difficult battle is the internal journey toward kindness.",
            "I have no enemies.",
            "A true warrior doesn't need a sword."
        ]
    },
    {
        title: "Hajime no Ippo",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-3",
        image: "https://cdn.myanimelist.net/images/anime/4/86334l.jpg",
        description: "Ippo Makunouchi discovers his talent for boxing and aims to become a champion.",
        tags: ["Sports", "Action"],
        year: "2000",
        rating: "8.8/10",
        keyLearnings: [
            "Boxers dont fight to hit. They fight to find the meaning of strength.",
            "The answer is at the end of every punch.",
            "Courage isn't the absence of fear; it's standing up when your legs are shaking."
        ]
    },
    {
        title: "Great Teacher Onizuka",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1",
        image: "https://cdn.myanimelist.net/images/anime/13/11460.jpg",
        description: "The former leader of a biker gang becomes a high school teacher.",
        tags: ["Comedy", "Slice of Life"],
        year: "1999",
        rating: "8.6/10",
        keyLearnings: [
            "To reach students, you must be unafraid to be human.",
            "Life is more than just grades.",
            "Sometimes you have to break down walls—literally—to open someone's heart."
        ]
    },
    {
        title: "Kuroko no Basket",
        type: AnimeType.Anime,
        status: WatchStatus.Completed,
        seasons: "S1-3",
        image: "https://cdn.myanimelist.net/images/anime/11/50453l.jpg",
        description: "A phantom sixth player helps his high school basketball team defeat the 'Generation of Miracles'.",
        tags: ["Sports"],
        year: "2012",
        rating: "8.4/10",
        keyLearnings: [
            "The greatest support allows others to shine.",
            "I am a shadow.",
            "Trust in your teammates is the only way to defeat a team of individuals."
        ]
    },
    {
        title: "I want to eat your pancreas",
        type: AnimeType.Movie,
        status: WatchStatus.Completed,
        seasons: "Movie",
        image: "https://cdn.myanimelist.net/images/anime/1768/93291l.jpg",
        description: "An emotional story about a high school boy who discovers his classmate has a terminal illness.",
        tags: ["Drama", "Romance"],
        year: "2018",
        rating: "8.6/10",
        keyLearnings: [
            "Living each day with no regrets.",
            "To live is to have a bond with others.",
            "I want to become part of you, so that I may live on within you."
        ]
    },
    {
        title: "Grave of the Fireflies",
        type: AnimeType.Movie,
        status: WatchStatus.Completed,
        seasons: "Movie",
        image: "https://cdn.myanimelist.net/images/anime/1485/141208l.jpg",
        description: "Two siblings struggle to survive in Japan during the final months of World War II.",
        tags: ["Drama", "War"],
        year: "1988",
        rating: "8.5/10",
        keyLearnings: [
            "War has no winners, only victims.",
            "Why do fireflies have to die so soon?",
            "Pride can be fatal when survival is at stake."
        ]
    },
    {
        title: "Spirited Away",
        type: AnimeType.Movie,
        status: WatchStatus.Completed,
        seasons: "Movie",
        image: "https://cdn.myanimelist.net/images/anime/6/79597l.jpg",
        description: "A young girl wanders into a world ruled by gods, witches, and spirits.",
        tags: ["Fantasy", "Adventure"],
        year: "2001",
        rating: "8.8/10",
        keyLearnings: [
            "Courage can break any curse.",
            "Don't forget your name.",
            "Greed turns humans into pigs. Generosity and kindness are the only true magic."
        ]
    },
    {
        title: "Your Name",
        type: AnimeType.Movie,
        status: WatchStatus.Completed,
        seasons: "Movie",
        image: "https://cdn.myanimelist.net/images/anime/5/87048l.jpg",
        description: "Two teenagers share a profound connection after discovering they are swapping bodies.",
        tags: ["Romance", "Supernatural"],
        year: "2016",
        rating: "8.9/10",
        keyLearnings: [
            "The thread of fate connects hearts.",
            "I'm always searching for someone.",
            "Twilight is the time when worlds blur, and miracles can happen."
        ]
    },
    {
        title: "A Silent Voice",
        type: AnimeType.Movie,
        status: WatchStatus.Completed,
        seasons: "Movie",
        image: "https://cdn.myanimelist.net/images/anime/1122/96435l.jpg",
        description: "A young man seeks redemption for bullying a deaf girl in elementary school.",
        tags: ["Drama"],
        year: "2016",
        rating: "8.9/10",
        keyLearnings: [
            "Redemption starts with listening.",
            "Forgiveness begins with self-forgiveness.",
            "Look people in the eye. The world is beautiful if you choose to see it."
        ]
    },

    // --- PLANNING ---
    { title: "Naruto", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-5 + Shippuden S1-21", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Frieren: Beyond Journey’s End", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Attack on Titan", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-4", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Fullmetal Alchemist Brotherhood", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Hunter x Hunter", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "JoJo's Bizarre Adventure", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-5", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "My Hero Academia", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-7", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Bleach", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "16+ seasons", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Kaiju No 8", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-2", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "One Piece", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "20+", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Fairy Tail", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-9", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Sword Art Online", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-4", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Black Clover", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-4 + Movie", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Berserk", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-2", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Made in Abyss", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-2", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Ping Pong the Animation", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Spy x Family", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-3", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "The Seven Deadly Sins", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-5", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Hell's Paradise", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Summer Time Rendering", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "To Your Eternity", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-2", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Neon Genesis Evangelion", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Gurren Lagann", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Parasyte: The Maxim", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Fate/Zero", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Violet Evergarden", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Your lie in April", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Hyouka", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Prison School", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Grand Blue", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Monster", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "March comes in like a Lion", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-2", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Ghost in the Shell", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-2", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "The Promised Neverland", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Charlotte", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Rascal Does Not Dream", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Gintama", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-9", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Assassination Classroom", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-2", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Blue Eye Samurai", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Lycoris Recoil", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Kaguya-sama", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-3", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Re:Zero", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-3", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Dandadan", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Jobless Reincarnation", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-2", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Cyberpunk: Edgerunners", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Clannad: After Story", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-2", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Oshi no Ko", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-2", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "86", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-2", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Bocchi the Rock!", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Chihayafuru", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-3", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Natsume's Book of Friends", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-7", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Bakemonogatari", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-3", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Mushishi", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-2", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Yu Yu Hakusho", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Rurouni Kenshin", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Inuyasha", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-2", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Nana", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Beck", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Black Lagoon", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-3", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Trigun", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Hellsing Ultimate", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Psycho-Pass", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-3", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Darker than Black", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-2", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Durarara!!", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-4", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Noragami", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-2", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Soul Eater", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Akame ga Kill!", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "No Game No Life", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "KonoSuba", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1-3", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Toradora!", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Angel Beats!", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Anohana", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Another", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Mirai Nikki", type: AnimeType.Anime, status: WatchStatus.Planning, seasons: "S1", image: "", description: "", tags: [], keyLearnings: [] },

    // Movies Planning
    { title: "5 Centimeters Per Second", type: AnimeType.Movie, status: WatchStatus.Planning, seasons: "", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Howl’s Moving Castle", type: AnimeType.Movie, status: WatchStatus.Planning, seasons: "", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Princess Mononoke", type: AnimeType.Movie, status: WatchStatus.Planning, seasons: "", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Suzume", type: AnimeType.Movie, status: WatchStatus.Planning, seasons: "", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "Weathering With You", type: AnimeType.Movie, status: WatchStatus.Planning, seasons: "", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "The Girl Who Leapt Through Time", type: AnimeType.Movie, status: WatchStatus.Planning, seasons: "", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "That Time I Got Reincarnated as a Slime", type: AnimeType.Movie, status: WatchStatus.Planning, seasons: "", image: "", description: "", tags: [], keyLearnings: [] },
    { title: "The Eminence in Shadow", type: AnimeType.Movie, status: WatchStatus.Planning, seasons: "", image: "", description: "", tags: [], keyLearnings: [] }
];
