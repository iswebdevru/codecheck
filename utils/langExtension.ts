import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { php } from "@codemirror/lang-php";

export default function (lang: string) {
  const langs: any = {
    Python: python(),
    JavaScript: javascript(),
    PHP: php(),
  };
  return langs[lang];
}
