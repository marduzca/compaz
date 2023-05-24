const useTimeOfTheDay = () => {
  const currentTime = new Date().getHours();

  return {
    isMorning: currentTime >= 7 && currentTime < 13,
    isAfternoon: currentTime >= 13 && currentTime < 19,
    isNight: currentTime >= 19 || currentTime < 7,
  };
};

export default useTimeOfTheDay;
