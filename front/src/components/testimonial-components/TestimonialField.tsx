interface TestimonialFieldProps {
  author: string;
  text: string;
  subject: string;
}

function TestimonialField({ author, text, subject }: TestimonialFieldProps) {
  return (
    <div className="py-2 bg-cerGreen w-[80vw] sm:w-[60vw] h-[25vh] rounded-[20px] flex flex-col items-center justify-between">
      <h2 className="text-center">{subject}</h2>
      <p className="w-full text-[18px] px-4 text-left">{text}</p>
      <span className="text-[18px] self-end pr-4 pt-2">
        {author ? author : `Anônimo`}
      </span>
    </div>
  );
}

export default TestimonialField;
