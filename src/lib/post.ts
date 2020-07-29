export default function post(input: string) {
  return new Promise(resolve => {
    setTimeout(() => {
      alert(input);
    }, 200);
  });
}
