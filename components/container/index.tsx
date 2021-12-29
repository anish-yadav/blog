import { Navbar } from "../navbar";

const Container = ({ children }: any) => {
  return (
    <div>
      <Navbar />
      {{ ...children }}
    </div>
  );
};

export default Container;
