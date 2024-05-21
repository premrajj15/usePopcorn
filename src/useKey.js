import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }
      document.addEventListener("keydown", callback);
      // console.log("close");
      return function () {
        document.removeEventListener("keydown", callback);
        // console.log("open");
      };
    },
    [action, key]
  );
}
