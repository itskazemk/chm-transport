interface LicensePlateType {
  licensePlateA: number;
  // licensePlateB: PersianLetter;
  licensePlateB: string;
  licensePlateC: number;
  licensePlateD: number;
}

// Define the type for possible Persian letters
type PersianLetterType =
  | "ا"
  | "ب"
  | "پ"
  | "ت"
  | "ث"
  | "ج"
  | "چ"
  | "ح"
  | "خ"
  | "د"
  | "ذ"
  | "ر"
  | "ز"
  | "س"
  | "ش"
  | "ص"
  | "ض"
  | "ط"
  | "ظ"
  | "ع"
  | "غ"
  | "ف"
  | "ق"
  | "ک"
  | "گ"
  | "ل"
  | "م"
  | "ن"
  | "و"
  | "ه"
  | "ی";

// Mapping of licensePlateB values to Persian letters in lowercase
const persianLetters: Record<string, string> = {
  الف: "f",
  ب: "b",
  پ: "P",
  ت: "T",
  ث: "C",
  ج: "j",
  چ: "c", // Wrong Not Exist
  ح: "h", // Wrong Not Exist
  خ: "x", // Wrong Not Exist
  د: "d",
  ذ: "z", // Wrong Not Exist
  ر: "r", // Wrong Not Exist
  ز: "Z",
  س: "s",
  ش: "M",
  ص: "s", // Wrong Not Exist
  ض: "z", // Wrong Not Exist
  ط: "t",
  ظ: "z", // Wrong Not Exist
  ع: "A",
  غ: "g", // Wrong Not Exist
  ف: "F",
  ق: "g", // Wrong 
  ک: "K",
  گ: "G",
  ل: "l",
  م: "m",
  ن: "n",
  و: "v",
  ه: "h",
  ی: "y", // Wrong
};

export function convertLicensePlate({
  licensePlateA,
  licensePlateB,
  licensePlateC,
  licensePlateD,
}: LicensePlateType) {
  const persianLetter = persianLetters[licensePlateB];
  console.log(licensePlateA, licensePlateB, licensePlateC, licensePlateD);
  console.log(persianLetter);
  return `IR${licensePlateD}-${licensePlateC}${persianLetter}${licensePlateA}`;
}
