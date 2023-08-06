FROM ubuntu:22.04
COPY mr-grocery-sql .
CMD ["./mr-grocery-sql"]