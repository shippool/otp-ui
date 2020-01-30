/* eslint-disable no-unused-vars */
/* stylelint-disable property-no-vendor-prefix */
/* stylelint-disable CssSyntaxError */
import React from "react";
import ReactDOMServer from "react-dom/server";
import L from "leaflet";

import styled, { css } from "styled-components";
import { Circle } from "styled-icons/fa-solid";

import { AerialTram, Bus, Streetcar, Max, Wes } from "@opentripplanner/icons";

// note: want to make these props of styled, so props.colorSelected
// BTW, 'props.color' works, since that's an established prop of styled
// https://stackoverflow.com/questions/52321539/react-passing-props-with-styled-components
const color = "#000";
const colorSelected = "#00bfff";
const colorHighlight = "#ccee77";

const normal = css`
  color: ${props => props.color || color};
  background-color: #fff;
  border: 1px solid ${props => props.color || color};
  :hover {
    color: ${props => props.colorSelected || colorSelected};
    background-color: ${props => props.colorSelected || colorSelected};
    border: 1px solid ${props => props.colorHighlight || colorHighlight};
  }
  border-radius: 50%;
`;

const tracked = css`
  color: ${props => props.colorSelected || colorSelected};
  background-color: ${props => props.colorSelected || colorSelected};
`;

export const VehicleCircle = styled(Circle)`
  ${normal}
  background-color: #000;
`;

export const TrackedVehicleCircle = styled(VehicleCircle)`
  ${tracked}
`;

export const NormBus = styled(Bus)`
  ${normal}
`;

export const TrackedBus = styled(NormBus)`
  ${tracked}
`;

export const NormTram = styled(Max)`
  ${normal}
`;

export const TrackedTram = styled(NormTram)`
  ${tracked}
`;

export const NormSC = styled(Streetcar)`
  ${normal}
`;

export const TrackedSC = styled(NormSC)`
  ${tracked}
`;

export const NormGond = styled(AerialTram)`
  ${normal}
`;

export const TrackedGond = styled(NormGond)`
  ${tracked}
`;

export const NormRail = styled(Wes)`
  ${normal}
`;

export const TrackedRail = styled(NormRail)`
  ${tracked}
`;

/**
 * find icons based on gtfsdb mode types
 * TODO: both icon names and these modes need to align better to standards
 * TODO: icons using trimet stuff needs to get away from MAX / WES / AERIALTRAM names, etc...
 */
export function makeVehicleIcon(mode, selectColor, isTracked) {
  let icon = null;
  switch (mode) {
    case "TRAM":
      icon = isTracked ? (
        <TrackedTram colorSelected={selectColor} />
      ) : (
        <NormTram colorSelected={selectColor} />
      );
      break;
    case "SC":
      icon = isTracked ? (
        <TrackedSC colorSelected={selectColor} />
      ) : (
        <NormSC colorSelected={selectColor} />
      );
      break;
    case "GONDOLA":
      icon = isTracked ? (
        <TrackedGond colorSelected={selectColor} />
      ) : (
        <NormGond colorSelected={selectColor} />
      );
      break;
    case "RAIL":
      icon = isTracked ? (
        <TrackedRail colorSelected={selectColor} />
      ) : (
        <NormRail colorSelected={selectColor} />
      );
      break;
    case "BUS":
      icon = isTracked ? (
        <TrackedBus colorSelected={selectColor} />
      ) : (
        <NormBus colorSelected={selectColor} />
      );
      break;
    default:
      icon = isTracked ? (
        <TrackedBus colorSelected={selectColor} />
      ) : (
        <NormBus colorSelected={selectColor} />
      );
      break;
  }

  let retVal = null;
  if (icon != null)
    retVal = L.divIcon({
      html: ReactDOMServer.renderToString(icon),
      className: "",
      popupAnchor: [0, -12],
      tooltipAnchor: [11, 0],
      iconSize: [22, 22]
    });
  else
    retVal = L.divIcon({
      html: "<span>--></span>"
    });

  return retVal;
}

// popup button
export const Button = styled.button`
  color: navy;
  border: none;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  padding-left: 0.2em;

  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
