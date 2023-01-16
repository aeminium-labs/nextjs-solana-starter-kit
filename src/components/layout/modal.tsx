import { Button, ButtonState } from "@components/home/button";
import { DEFAULT_WALLET } from "@utils/globals";
import React from "react";

type Props = {
  onClick: Function;
  butttonState: ButtonState;
  headerContent: string;
  buttonContent: string;
  isToken?: boolean;
  id: string;
};

export function Modal({
  onClick,
  butttonState,
  headerContent,
  buttonContent,
  isToken = false,
  id,
}: Props) {
  const [address, setAddress] = React.useState<string | undefined>();
  const [amount, setAmount] = React.useState<string | undefined>();

  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="font-bold text-xl mb-2">{headerContent}</h3>
          <div className="form-control w-full mb-2">
            <label className="label">
              <span className="label-text">Wallet Address</span>
            </label>
            <input
              type="text"
              placeholder={DEFAULT_WALLET}
              className="input input-bordered w-full"
              onChange={(ev) => setAddress(ev.currentTarget.value)}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Amount</span>
            </label>
            <input
              type="number"
              placeholder="1"
              className="input input-bordered w-full"
              onChange={(ev) => setAmount(ev.currentTarget.value)}
            />
          </div>
          <div className="modal-action">
            <Button
              state={butttonState}
              onClick={onClick({
                isToken,
                address,
                amount,
              })}
              className="btn-primary"
            >
              {buttonContent}
            </Button>
          </div>
        </label>
      </label>
    </>
  );
}
