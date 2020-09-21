---
id: ssr-overview
title: Server Side Rendering
sidebar_label: Overview
---

## Intro to SSR

In the context of single page applications (SPAs), server-side rendering (SSR) refers to dynamic generation of the HTML page that is sent from web server to browser. In a single page application, the server only generates the very first page that the user requests, leaving all subsequent pages to be rendered by the browser.

To accomplish server-side rendering of an SPA, javascript code is executed in NodeJS to generate the initial HTML. In the browser, the same javascript code is executed during a "hydration" process, which attaches event listeners to the HTML. Most popular UI Frameworks (Vue, React, Angular, etc) are capable of executing in both NodeJS and the browser, and offer APIs for hydration of the application. Additionally, there are popular libraries such as NextJS and Nuxt which enhance the developer experience of server-side rendering.

In the context of microfrontends, server-side rendering refers to assembling the HTML from multiple, separate microfrontends. Each microfrontend controls a fragment of the HTML sent from web server to browser, and hydrate their fragment once initialized in the browser.

## Purpose

A primary purpose of server-side rendering is improved performance. Server-side rendered pages often display their content to users faster than their static counterparts. Other reasons for SSR include improved SEO.

## Implementation Overview

The ultimate goal of server-side rendering is to generate an HTTP response that the browser will display to the user while javascript is hydrating. This is done with the following steps:

1. Identify which microfrontends to render for the incoming HTTP request.
2. Render the HTML for each microfrontend to an

## Defining Layout

## HTTP Response Headers

## HTTP Response Body

### Shared server with dynamic module loading

### Separate servers over HTTP