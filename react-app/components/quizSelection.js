import React from 'react';

export default class QuizSelectionElement extends React.Component {

  constructor(props) {
    super(props);
  }
  
  onChangeSelection(e) {
    if (this.props.showValidation === false) {
      this.props.onSelect(e.target.value);
    }
  }
  
  getStyleObjectForItemWithQuestionId(id) {
    if (this.props.showValidation === true) {
      if (this.props.quizItem.answerId === id) {
        return styles.itemTrue;
      }
      else if (this.props.selectedIndex === id) {
        return styles.itemFalse;
      }
    }
    
    return styles.item;
  }

  getStyleObjectForLabelItemWithQuestionId(id) {
    if (this.props.showValidation === true) {
      if (this.props.quizItem.answerId === id) {
        return styles.radioLabelWhite;
      }
      else if (this.props.selectedIndex === id) {
        return styles.radioLabelWhite;
      }
    }

    return styles.radioLabel;
  }

  render() {
    return(
      <div>
        <text style={styles.title}>{this.props.questionNumber + ' -> ' + this.props.quizItem.question}</text>
        <div onChange={this.onChangeSelection.bind(this)} style={styles.mainDiv}>
          
          <div style={this.getStyleObjectForItemWithQuestionId(this.props.quizItem.options[0].id)}>
            <input type="radio"
                   id="radio1"
                   value={this.props.quizItem.options[0].id}
                   name="gender"
                   checked={this.props.selectedIndex === this.props.quizItem.options[0].id}
                   style={styles.radioButton}
            />
            <label htmlFor="radio1" style={this.getStyleObjectForLabelItemWithQuestionId(this.props.quizItem.options[0].id)}>
              {this.props.quizItem.options[0].title}
            </label>
          </div>

          <div style={this.getStyleObjectForItemWithQuestionId(this.props.quizItem.options[1].id)}>
            <input type="radio"
                   id="radio2"
                   value={this.props.quizItem.options[1].id}
                   name="gender"
                   checked={this.props.selectedIndex === this.props.quizItem.options[1].id}
                   style={styles.radioButton}
            />
            <label htmlFor="radio2" style={this.getStyleObjectForLabelItemWithQuestionId(this.props.quizItem.options[1].id)}>
              {this.props.quizItem.options[1].title}
            </label>
          </div>
          

          <div style={this.getStyleObjectForItemWithQuestionId(this.props.quizItem.options[2].id)}>
            <input type="radio"
                   id="radio3"
                   value={this.props.quizItem.options[2].id}
                   name="gender"
                   checked={this.props.selectedIndex === this.props.quizItem.options[2].id}
                   style={styles.radioButton}
            />
            <label htmlFor="radio3" style={this.getStyleObjectForLabelItemWithQuestionId(this.props.quizItem.options[2].id)}>
              {this.props.quizItem.options[2].title}
            </label>
          </div>
          
          

          <div style={this.getStyleObjectForItemWithQuestionId(this.props.quizItem.options[3].id)}>
            <input type="radio"
                   id="radio4"
                   value={this.props.quizItem.options[3].id}
                   name="gender"
                   checked={this.props.selectedIndex === this.props.quizItem.options[3].id}
                   style={styles.radioButton}
            />
            <label htmlFor="radio4" style={this.getStyleObjectForLabelItemWithQuestionId(this.props.quizItem.options[3].id)}>
              {this.props.quizItem.options[3].title}
            </label>
          </div>
        </div>
      </div>
    );
  }
}

QuizSelectionElement.propTypes = {
  questionNumber: React.PropTypes.number,
  quizItem: React.PropTypes.object,
  onSelect: React.PropTypes.func,
  selectedIndex: React.PropTypes.string,
  showValidation: React.PropTypes.bool,
};
QuizSelectionElement.defaultProps = {
  showValidation: false,
};

const styles = {
  
  title: {
    fontFamily: 'MeltixRegular',
    fontSize: 25,
    color: '#33691E',
  },
  
  mainDiv: {
    marginTop: 15,
  },
  
  item: {
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 4,
    borderWidth: 1,
    padding: 8,
    borderColor: '#E8F5E9',
    backgroundColor: '#F1F8E9',
  },

  itemTrue: {
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 4,
    borderWidth: 1,
    padding: 8,
    borderColor: '#E8F5E9',
    backgroundColor: '#4CAF50',
  },

  itemFalse: {
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 4,
    borderWidth: 1,
    padding: 8,
    borderColor: '#E8F5E9',
    backgroundColor: '#F44336',
  },
  
  radioButton: {
    marginRight: 10,
  },
  
  radioLabel: {
    fontFamily: 'MeltixLight',
    fontSize: 20,
    color: '#33691E',
  },

  radioLabelWhite: {
    fontFamily: 'MeltixBold',
    fontSize: 20,
    color: 'white',
  },
};