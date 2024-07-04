const CheckedIcons = () => {
  return (
    <div
      style={{
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(45deg, hsl(192, 100%, 67%),hsl(280, 87%, 65%))',
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
        <path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6" />
      </svg>
    </div>
  );
};

export default CheckedIcons;
