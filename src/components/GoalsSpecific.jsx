const GoalsSpecific = ({ data }) => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
    </>
  );
};

export default GoalsSpecific;
