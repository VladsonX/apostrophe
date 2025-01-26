const avatarColors = [
    "#D4D4D4", "#B1B0E5", "#E9A885", "#B0E5DA", "#A8A8A8",
    "#C1BEE8", "#EAB693", "#A9E6D5", "#D7D7D7", "#ADACD4",
    "#E7AC99", "#A0D5C3", "#D1D1D1", "#BBB4E1", "#F0B298",
    "#A6D8CA", "#D3D3D3", "#B2B1E3", "#E9BFA5", "#B1E6DB"
  ];
  
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
  
    return avatarColors[hash % avatarColors.length];
  };
  
  const enrichPostsWithChannelLogoPlaceholderBackground = (posts) => {
    posts.forEach((post) => {
      if (post.channel && post.channel.channelId) {
        const logoPlaceholderColor = generateChannelLogoPlaceholderBackgroundColor(post.channel.channelId);
        post.channel.logoPlaceholderColor = logoPlaceholderColor;
      } else {
        console.warn(`Post with ID ${post.postId} has no valid channel information.`);
      }
    });
  };
  
  export default enrichPostsWithChannelLogoPlaceholderBackground;