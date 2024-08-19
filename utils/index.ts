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
  ا: "a",
  ب: "b",
  پ: "p",
  ت: "t",
  ث: "s",
  ج: "j",
  چ: "c",
  ح: "h",
  خ: "x",
  د: "d",
  ذ: "z",
  ر: "r",
  ز: "z",
  س: "s",
  ش: "sh",
  ص: "s",
  ض: "z",
  ط: "t",
  ظ: "z",
  ع: "a",
  غ: "g",
  ف: "f",
  ق: "g",
  ک: "k",
  گ: "g",
  ل: "l",
  م: "m",
  ن: "n",
  و: "v",
  ه: "h",
  ی: "y",
};

export function convertLicensePlate({
  licensePlateA,
  licensePlateB,
  licensePlateC,
  licensePlateD,
}: LicensePlateType) {
  const persianLetter = persianLetters[licensePlateB];
  return `IR${licensePlateD}-${licensePlateC}${persianLetter}${licensePlateA}`;
}
