
import { Link } from "react-router-dom";
import DoctorsDirectory from "../components/DoctorsDirectory";

function Doctors() {
  return (
    <main className="min-h-screen bg-clinic-background pt-20">
      <section className="section-padding-lg">
        <div className="container-clinic">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="eyebrow">Our Medical Team</span>
            <h1 className="section-title mt-5">
              Meet the people behind your care.
            </h1>
            <p className="section-description mx-auto mt-5">
              Explore our demo doctor directory and learn about each
              specialist.
            </p>
          </div>

          <DoctorsDirectory />

          <div className="mt-12 text-center">
            <Link
              to="/book-appointment"
              className="clinic-button clinic-button-primary"
            >
              Request an Appointment
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Doctors;
