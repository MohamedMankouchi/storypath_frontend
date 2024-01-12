import React from "react";
import YoutubeVideo from "./YoutubeVideo";
import { useState, useEffect } from "react";
import { getAnswers } from "../../services/scenarios";
import Swal from "sweetalert2";
const ScenarioFinal = ({ id, final, onReset }) => {
  const [answers, setAnswers] = useState();
  useEffect(() => {
    getAnswers(id).then((answers) => {
      setAnswers(answers);
    });
  }, [id]);

  return (
    <>
      <div className="row">
        <div className="col-12 mb-3">
          {/* <h2>Volledig scenario</h2> */}
          <YoutubeVideo videoId={final.videoId} />
        </div>

        <div
          className="mb-3"
          dangerouslySetInnerHTML={{ __html: final.paragraphs }}
        ></div>
      </div>
      <br></br>
      <div className="row">
        <div className="col-12">
          <h4>Jouw antwoorden:</h4>
          <ul>
            {answers
              ? answers.map((a, i) => (
                  <li className="col-12" key={i}>
                    <p>
                      Stap {a.step}: Keuze {a.choice} - {a.feedback}
                    </p>
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>

      <br></br>
      <div className="row">
        <div className="col-12">
          <button
            className="btn btn-danger mb-3"
            onClick={() =>
              Swal.fire({
                title: "Ben jij zeker?",
                text: "Deze actie is onomkeerbaar",
                icon: "warning",
                showCancelButton: true,

                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ja, scenario opniew instellen!",
                cancelButtonText: "Nee",
                showLoaderOnConfirm: true,
              }).then(async (result) => {
                if (result.isConfirmed) {
                  const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    },
                  });
                  Toast.fire({
                    icon: "success",
                    title: "Scenario opnieuw ingesteld",
                  });

                  onReset();
                }
              })
            }
          >
            Reset scenario
          </button>
        </div>
      </div>
    </>
  );
};

export default ScenarioFinal;
