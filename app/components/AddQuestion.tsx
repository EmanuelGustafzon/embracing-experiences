'use clinet'
import { useEffect, useState } from "react";

interface Option {
    option: string;
    correct: boolean;
  }

  interface Props {
    submitFunction: (question: string, options: Option[]) => void;
    currentQuestion: string;
    currentOptions: Option[];
  }

const AddQuestion: React.FC<Props> = ({submitFunction, currentQuestion = "", currentOptions = []}) => {

    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState<Option[]>([
        {option: '', correct: false},
        {option: '', correct: false},
        {option: '', correct: false},
        {option: '', correct: false},
    ]);

    useEffect(() => {
      setQuestion(currentQuestion)
      setOptions(currentOptions)
    }, [currentQuestion , currentOptions])
  
    const handleQuestionChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
      setQuestion(e.target.value);
    };
  
    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const updatedOptions = [...options];
        updatedOptions[index] = { ...updatedOptions[index], option: e.target.value };
        setOptions(updatedOptions);
      };

      const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { checked } = e.target;
        const updatedOptions = [...options];
        updatedOptions[index] = { ...updatedOptions[index], correct: checked ? true : false };
        setOptions(updatedOptions);
    };
    

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const updatedOptions = options.map((option, index) => ({
        ...option,
        correct: options[index].correct ? true : false
    }));
    submitFunction(question, updatedOptions);
};

  return (
<div className="max-w-md mx-auto">
  <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2" htmlFor="question">
        Question
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        id="question"
        type="text"
        placeholder="Question"
        value={question}
        onChange={handleQuestionChange}
        required
      />
    </div>
    {[0, 1, 2, 3].map((index) => (
      <div key={index} className="mb-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight"
          placeholder={`Option ${index + 1}`}
          value={options[index].option}
          type="text"
          onChange={(e) => handleOptionChange(e, index)}
          required
        />
        <input
          className="mt-2"
          type="checkbox"
          onChange={(e) => handleCheckboxChange(e, index)}
          checked={options[index].correct}
        />
        <span className="ml-2 text-gray-700">Select the correct option</span>
      </div>
    ))}
    <button
      className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={handleSubmit}
    >
      Add Question
    </button>
  </form>
</div>
  );
}

export default AddQuestion