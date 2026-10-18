
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import DoctorsDirectory from "../components/DoctorsDirectory";

function DoctorsSection() {
  return (
    <section className="section-padding-lg bg-white">
      <div className="container-clinic">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">Meet Our Specialists</span>
            <h2 className="section-title mt-5">
              Experienced people. Personal care.
            </h2>
            <p className="section-description mt-4">
              Explore our doctor directory and find a specialist suited to
              your needs.
            </p>
          </div>

          <Link
            to="/doctors"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-clinic-navy hover:text-clinic-teal"
          >
            View All Doctors
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>

        <DoctorsDirectory />
      </div>
    </section>
  );
}

export default DoctorsSection;
