curl --user ${CIRCLE_TOKEN}: \
    --request POST \
    --form revision=776dc995f391ff95851eafe1c4853bad256da6b9 \
    --form config=@config.yml \
    --form notify=false \
        https://circleci.com/api/v1.1/project/github/CanopyTax/single-spa.js.org/tree/master