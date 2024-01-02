const TheorySpecific = ({ data }) => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
    </>
  );
};

export default TheorySpecific;
