export const createMessage = (container, message) => {
  const div = document.createElement("div");
  div.className = "flex justify-center items-center h-64";
  const p = document.createElement("p");
  p.className = "text-2xl text-gray-500";
  p.textContent = message;
  div.appendChild(p);
  container.appendChild(div);
};
