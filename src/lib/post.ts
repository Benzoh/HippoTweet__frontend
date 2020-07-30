export default function post(input: string) {
  return new Promise(resolve => {
    setTimeout(() => {
      // TODO: tweet post
      alert(input);
    }, 200);
  });
}
