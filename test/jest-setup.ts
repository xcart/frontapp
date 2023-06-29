import '@testing-library/jest-dom'
// @ts-ignore
import React from 'react'
import ResizeObserver from 'resize-observer-polyfill'

global.React = React
global.ResizeObserver = ResizeObserver
