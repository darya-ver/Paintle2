import Modal from "react-modal";
import { Button } from "./Button";
import { useState } from "react";
import { START_DATE_STRING } from "../constants";
import { getISOStringInTimeZone } from "../utils";

type DatePickerModalProps = {
  datePickerModalOpen: boolean;
  onModalClose: () => void;
  onPlay: (date: Date) => void;
};

export const DatePickerModal = ({
  datePickerModalOpen,
  onModalClose,
  onPlay,
}: DatePickerModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  console.log({ selectedDate: getISOStringInTimeZone(selectedDate) });

  return (
    <Modal
      isOpen={datePickerModalOpen}
      contentLabel="Example Modal"
      style={{
        content: {
          backgroundColor: "#cff6cf",
          inset: "20px",
        },
      }}
    >
      <div className="ModalContent">
        <div className="ModalClose">
          <Button onClick={onModalClose} variant="Blank">
            <svg height="25" width="25">
              <g transform="translate(3.9661017,3.5677966)">
                <path
                  stroke="rgb(56,83,56)"
                  stroke-width="3"
                  d="M -2.5783352e-4,-0.00146808 17.435473,18.212367"
                />
                <path
                  stroke="rgb(56,83,56)"
                  stroke-width="3"
                  d="M -2.5783352e-4,18.212367 17.435473,-0.00146808"
                />
              </g>
            </svg>
          </Button>
        </div>
        <div className="ModalCenterContent">
          <h2>Select a date to play previous Paintle</h2>
          <input
            aria-label="Date"
            type="date"
            min={START_DATE_STRING}
            max={getISOStringInTimeZone(new Date())}
            onChange={(evt) => {
              const date = new Date(evt.target.value);
              console.log({ updatedDate: date });
              setSelectedDate(date);
            }}
            value={getISOStringInTimeZone(selectedDate)}
          />
        </div>
        <Button
          onClick={() => {
            if (selectedDate) {
              onPlay(selectedDate);
              onModalClose();
            }
          }}
          disabled={!selectedDate}
        >
          Play
        </Button>
      </div>
    </Modal>
  );
};
