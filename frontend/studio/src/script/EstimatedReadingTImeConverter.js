const convertEstimatedReadingTime = (estimatedReadingTimeSecs) => {

    if (estimatedReadingTimeSecs == null || typeof estimatedReadingTimeSecs !== 'number' || estimatedReadingTimeSecs < 0) {
        throw new Error("Invalid estimated reading time value.");
    }

    const minutes = Math.ceil(estimatedReadingTimeSecs / 60);
    return minutes > 15
        ? "More than 15 minutes to read."
        : `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} to read.`;
}

export default convertEstimatedReadingTime;