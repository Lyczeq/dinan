import type { Answer, Question } from '@dinan/types';
import { Button } from 'components/atoms/Button';
import { Checkbox } from 'components/atoms/Checkbox';

type ExamParticipationFormProps = {
  questions: Question[];
  examAddress: string;
};

type QuestionParticipationFormProps = {
  question: Question;
  questionIndex: number;
};

type AnswerParticipationFormProps = {
  answer: Answer;
  answerIndex: number;
};

const AnswerParticipationForm = ({
  answer,
  answerIndex,
}: AnswerParticipationFormProps) => {
  return (
    <li className="flex gap-2 mb-2">
      <div className="flex items-center gap-2 self-start">
        <p className="w-2">{answerIndex + 1}. </p>
        <Checkbox className="w-max mt-0 gap-0 mb-0" />
      </div>
      <p>{answer.text}</p>
    </li>
  );
};

const QuestionParticipationForm = ({
  question,
  questionIndex,
}: QuestionParticipationFormProps) => {
  return (
    <li className="w-4/5 my-2 border border-secondary rounded-md flex gap-4 flex-col p-4">
      <p className="text-justify">
        <span>{questionIndex + 1}. </span>
        <span>{question.text}</span>
      </p>
      <p>Answers: </p>
      <ul>
        {question.answers.map((answer, index) => (
          <AnswerParticipationForm
            key={answer.id}
            answer={answer}
            answerIndex={index}
          />
        ))}
      </ul>
    </li>
  );
};

export const ExamParticipationForm = ({
  questions,
  examAddress,
}: ExamParticipationFormProps) => {
  return (
    <div className="w-full flex flex-col justify-center gap-4">
      <ul className="rounded-md border-secondary bg-slate-100 mt-4 flex flex-col justify-center items-center py-2">
        {questions.map((question, index) => (
          <QuestionParticipationForm
            key={question.id}
            question={question}
            questionIndex={index}
          />
        ))}
      </ul>
      <Button className="self-center">Submit exam</Button>
    </div>
  );
};
