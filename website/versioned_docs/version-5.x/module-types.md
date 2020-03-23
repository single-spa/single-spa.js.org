---
id: module-types
title: single-spa conceptual module types
sidebar_label: Conceptual Module Types
---

# Concept: single-spa modules

Single-spa has [different categories](/docs/microfrontends-concept#types-of-microfrontends) of microfrontends. It is up to you where and how you use each of them. However, the single-spa core team has [recommendations](/docs/recommended-setup/#applications-versus-parcels-versus-utility-modules).

Here is how each single-spa module works conceptually. This information should help you understand our [recommendations](/docs/recommended-setup/#applications-versus-parcels-versus-utility-modules) on which to use where.

| application                       | parcel                               | utility                              |
| --------------------------------- | ------------------------------------ | ------------------------------------ |
| has multiple routes               | no routes                            | no route                             |
| declarative API                   | impertive API                        | not registered/mounted by single-spa |
| renders UI                        | renders UI                           | no UI                                |
| single-spa managed lifecylces     | custom managed lifecycles            | no dom elements                      |
| Core building block               | only needed with multiple frameworks | useful to share business logic       |

Each single-spa module is in reality an in browser javascript module see [here](/docs/recommended-setup#in-browser-versus-build-time-modules) for more information. Each type/module fits into the overal microfrontend approach.
