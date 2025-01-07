const enrichChannelsWithLogoPlaceholderBackground = (channels) => channels.forEach(channel => {
    const logoPlaceholderColor = generateChannelLogoPlaceholderBackgroundColor(channel.channelId);
    channel.logoPlaceholderColor = logoPlaceholderColor;
});

const generateChannelLogoPlaceholderBackgroundColor = (channelId) => {

    if (typeof channelId !== "string") {
        throw new Error("Invalid input: channelId must be a string.");
    }

    if (channelId.length === 0) {
        throw new Error("Invalid input: channelId must not be an empty string.");
    }

    let hash = 0;

    for (let i = 0; i < channelId.length; i++) {
        const char = channelId.charCodeAt(i);
        hash = (hash * 31 + char) % 2147483647;
    }

    return avatarColors[hash % (avatarColors.length - 1)];
}

// TODO: alter the set of colors

const avatarColors = [
    // "#FF5733", // Bright red-orange
    // "#33FF57", // Bright green
    // "#3357FF", // Bright blue
    // "#FF33A1", // Bright pink
    // "#FFC300", // Bright yellow
    // "#33FFF3", // Cyan
    // "#A833FF", // Bright purple
    // "#FF8C33", // Orange
    // "#5CFF33", // Lime green
    // "#336EFF", // Azure
    // "#FF3333", // Red
    // "#33FF8C", // Mint green
    // "#FF5733", // Coral
    // "#33A1FF", // Light blue
    // "#FF33F5", // Magenta
    // "#FFD700", // Golden
    // "#40E0D0", // Turquoise
    // "#FF4500", // Orange-red
    // "#7FFF00", // Chartreuse green
    // "#BA55D3", // Orchid purple

    "#D4D4D4", // Светло-серый
    "#B1B0E5", // Мягкий лавандовый
    "#E9A885", // Нежный персиковый
    "#B0E5DA", // Пастельный бирюзовый
    "#A8A8A8", // Серебристый серый
    "#C1BEE8", // Сиреневый с холодным подтоном
    "#EAB693", // Кремовый абрикос
    "#A9E6D5", // Мягкий морской волны
    "#D7D7D7", // Перламутрово-серый
    "#ADACD4", // Фиалковый
    "#E7AC99", // Лососевый
    "#A0D5C3", // Аквамариновый
    "#D1D1D1", // Графитовый серый
    "#BBB4E1", // Фиолетовый пастельный
    "#F0B298", // Светло-розовый песочный
    "#A6D8CA", // Мятный лед
    "#D3D3D3", // Нейтральный серый
    "#B2B1E3", // Ледяной лиловый
    "#E9BFA5", // Сахарный миндаль
    "#B1E6DB", // Пастельно-аквамариновый
];

export default enrichChannelsWithLogoPlaceholderBackground;