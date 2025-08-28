'use client'

/* eslint-disable */

import parse from "html-react-parser";

const GeneratedResult = ({code}: any) => {
  return (
    <div>
      {parse(code)}
    </div>
  )
}

export default GeneratedResult;