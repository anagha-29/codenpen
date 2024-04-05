import { useEffect, useState } from "react";

const PREFIX = "codepen-clone";
export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;
  //setting up the hook

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);

    //if we have value in localstorage return the json object (parsed value -i.e String to json object value)
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  //set useEffect -- for everytime we change the value.
  //The JSON.stringify() method converts JavaScript objects into strings.
  useEffect(() => {
    localStorage.setItem(prefixedKey,JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
