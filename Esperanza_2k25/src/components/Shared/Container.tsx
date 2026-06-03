import { ReactNode } from "react";

const Container = ({ children }: { children?: ReactNode }) => {
  return (
    <section className="px-4 py-6 sm:px-10 md:px-16 lg:px-20">
      {children || null}
    </section>
  );
};

export default Container;
