# Pomodoro-Timer


### Resources
https://www.freecodecamp.org/news/css-shapes-explained-how-to-draw-a-circle-triangle-and-more-using-pure-css/
https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks

flip a card repo example
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }, [counter]);
