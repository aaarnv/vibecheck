// Define the getRandomColor function
export const getRandomColor = () => {
    const colors = ['#FF6347', '#4682B4', '#32CD32', '#FFD700', '#DA70D6'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  