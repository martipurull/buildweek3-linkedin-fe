export const getExperience = async (profileID, experienceID) => {
  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${profileID}/experiences/${experienceID}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch");
    } else {
      const experience = await response.json();
      return experience;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
