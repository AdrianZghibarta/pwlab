import React from 'react';

export default class QuizFinalElement extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div>
        <p style={styles.title}>Hey man, you have a total score of {this.props.totalScore} points :)</p>
        <p style={styles.label}>You can try one more time this hell quiz, just press RESET!</p>
      </div>
    );
  }
}

QuizFinalElement.propTypes = {
  totalScore: React.PropTypes.number.isRequired,
};

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