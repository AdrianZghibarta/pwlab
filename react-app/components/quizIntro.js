import React from 'react';

export default class QuizIntroElement extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <p style={styles.title}> Hey, please pay attention, it's important: </p>
        <p style={styles.label}>- Correct answer gives 10 points</p>
        <p style={styles.label}>- Incorrect answer gives -5 points</p>
        <p style={styles.label}>- Skipping question gives -2 points</p>
        <p style={styles.label}>- When timer expires you loose 20 points</p>
        <p style={styles.title}>Press start to begin your 10 questions quiz!</p>
      </div>
    );
  }
}

const styles = {
  title: {
    fontFamily: 'MeltixRegular',
    fontSize: 25,
    color: '#33691E',
  },
  label: {
    fontFamily: 'MeltixLight',
    fontSize: 20,
    color: '#33691E',
  },
};