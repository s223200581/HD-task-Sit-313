// src/components/FindQuestionPage.js
import React, { useState } from 'react';
import { format } from 'date-fns';
import Draggable from 'react-draggable';
import './FindQuestionPage.css';

const FindQuestionPage = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: 'How to implement Firebase in React?',
      description: 'I need help with Firebase integration.',
      tag: 'React',
      date: new Date(),
    },
    {
      id: 2,
      title: 'What is a closure in JavaScript?',
      description: 'Can anyone explain closures in JavaScript?',
      tag: 'JavaScript',
      date: new Date(),
    },
  ]);

  const [filter, setFilter] = useState('');
  const [filterBy, setFilterBy] = useState('title');

  const [newQuestion, setNewQuestion] = useState({
    title: '',
    description: '',
    tag: '',
  });

  // Handle filtering
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilterByChange = (e) => {
    setFilterBy(e.target.value);
  };

  const filteredQuestions = questions.filter((question) => {
    if (filterBy === 'title') {
      return question.title.toLowerCase().includes(filter.toLowerCase());
    } else if (filterBy === 'tag') {
      return question.tag.toLowerCase().includes(filter.toLowerCase());
    } else if (filterBy === 'date') {
      return format(question.date, 'yyyy-MM-dd').includes(filter);
    }
    return true;
  });

  // Add a new question
  const handleAddQuestion = () => {
    const newId = questions.length + 1;
    const newQ = {
      ...newQuestion,
      id: newId,
      date: new Date(),
    };
    setQuestions([...questions, newQ]);
    setNewQuestion({ title: '', description: '', tag: '' });
  };

  // Delete a question
  const handleDeleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  // Toggle expand/collapse question card
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const toggleExpand = (id) => {
    if (expandedQuestion === id) {
      setExpandedQuestion(null);  // Collapse if already expanded
    } else {
      setExpandedQuestion(id);  // Expand the selected question
    }
  };

  // Handle drag & drop (reordering)
  const handleDragStop = (e, data, question) => {
    const newIndex = Math.round(data.y / 100);  // Assuming card height is 100px
    const updatedQuestions = [...questions];
    const draggedItem = updatedQuestions.splice(questions.indexOf(question), 1)[0];
    updatedQuestions.splice(newIndex, 0, draggedItem);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="find-question-page">
      <h1>Find Questions</h1>

      {/* Filter Options */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Filter questions"
          value={filter}
          onChange={handleFilterChange}
        />
        <select onChange={handleFilterByChange} value={filterBy}>
          <option value="title">Title</option>
          <option value="tag">Tag</option>
          <option value="date">Date</option>
        </select>
      </div>

      {/* New Question Form */}
      <div className="new-question-form">
        <input
          type="text"
          placeholder="Title"
          value={newQuestion.title}
          onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newQuestion.description}
          onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tag"
          value={newQuestion.tag}
          onChange={(e) => setNewQuestion({ ...newQuestion, tag: e.target.value })}
        />
        <button onClick={handleAddQuestion}>Add Question</button>
      </div>

      {/* Questions List */}
      <div className="questions-list">
        {filteredQuestions.map((question) => (
          <Draggable
            key={question.id}
            axis="y"
            onStop={(e, data) => handleDragStop(e, data, question)}
          >
            <div className="question-card">
              <h3>{question.title}</h3>
              <p><strong>Tag:</strong> {question.tag}</p>
              <p><strong>Date:</strong> {format(question.date, 'yyyy-MM-dd')}</p>
              {expandedQuestion === question.id && (
                <p><strong>Description:</strong> {question.description}</p>
              )}
              <div className="card-actions">
                <button onClick={() => toggleExpand(question.id)}>
                  {expandedQuestion === question.id ? 'Collapse' : 'Expand'}
                </button>
                <button onClick={() => handleDeleteQuestion(question.id)}>Delete</button>
              </div>
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default FindQuestionPage;
