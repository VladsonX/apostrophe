// Pure helpers that turn the user's subscription list into UI state.
// A subscription is either channel-wide ({ channel }) or for one topic ({ channel, topic }).

export const getChannelFollowStatus = (subscriptions, channel) => {
  const forChannel = subscriptions.filter(
    (subscription) => subscription.channel.channelId === channel.channelId,
  );

  if (!forChannel.length) {
    return { isFollowing: false, followedTopics: null };
  }

  const topicSubscriptions = forChannel.filter((subscription) => subscription.topic);
  if (topicSubscriptions.length) {
    return {
      isFollowing: true,
      followedTopics: topicSubscriptions.map((subscription) => subscription.topic),
    };
  }

  // Channel-wide subscription means every topic of the channel is followed.
  return {
    isFollowing: true,
    followedTopics: channel.topics?.length ? channel.topics : null,
  };
};

export const isFollowingTopic = (subscriptions, channelId, topicId) =>
  subscriptions.some(
    (subscription) =>
      subscription.topic?.topicId === topicId ||
      (subscription.channel.channelId === channelId && !subscription.topic),
  );
