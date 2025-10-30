const PhoneNumberFilter = ({
  text,
  setPhoneNumber,
}: {
  text: any;
  setPhoneNumber: any;
}) => {
  const cleaned = text.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (match) {
    const formatted = !match[2]
      ? match[1]
      : `${match[1]}${match[2]}${match[3] ? `${match[3]}` : ''}`;
    setPhoneNumber(formatted);
  }
};
export default PhoneNumberFilter;
