/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import MDXComponents from "@theme-original/MDXComponents";

export default {
  ...MDXComponents,
  /* eslint-disable react/display-name */
  /* eslint-disable react/prop-types */
  codehtml: (props) => <code>{props.children}</code>,
  /* eslint-enable react/prop-types */
  /* eslint-enable react/display-name */
};
