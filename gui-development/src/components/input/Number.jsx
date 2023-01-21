import PhoneInput from "react-phone-input-2";

export default function Number({ number, setNumber, ...props }) {
  return (
    <PhoneInput
      {...props}
      country={"us"}
      containerClass="w-full border-2 rounded-sm"
      enableSearch={true}
      countryCodeEditable={false}
      inputClass="!w-full !h-auto p-2 !bg-gray-50 !border-none"
      specialLabel=""
      autocompleteSearch={true}
      value={number}
      onChange={(phone) => setNumber(phone)}
    />
  );
}
