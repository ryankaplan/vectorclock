# vectorclock.sk

This is a simple vector clock implementation written in [Skew](http://skew-lang.org/).

What is Skew? Skew is a language that compiles to Javascript and C#, and will soon compile
to C++ too.

What are vector clocks? They're a data structure that help you determine a rough sense of
"this event" caused "that event" in distributed systems. Formally: they help you generate
a partial ordering (aka a directed acyclic graph) on the events in your system.

Here are my suggestions for how to learn more:

- Go [here](http://www.cs.rutgers.edu/~pxk/417/notes/clocks/) if you're interested in their formal description/theory.
- Go [here](http://basho.com/posts/technical/why-vector-clocks-are-easy/) if you're interested in a high level description of their applications.
- Go [here](http://basho.com/posts/technical/why-vector-clocks-are-hard/) if you're interested in a detailed description of how to use them.

## Documentation

There are two classes: `VectorClock` and `VectorClock.Time`. Each site initializes a
`VectorClock` with its `siteId`. Before any message is sent, the site calls `tick`
and when any message is received, the site calls `tickAndMerge`.

```
class VectorClock {
	def new(siteId string)

	def new(siteId string, time Time)

	def currentTime Time

	# Call when an logical event happens on this site. Typically
	# right before you send a message.
	def tick

	# Call when you receive a message from another client.
	def tickAndMerge(receivedTime Time)
}
```

And here's the `VectorClock.Time` API

```
class VectorClock.Time {

	def new

	def new(timeJson StringMap<int>)

	def toJson dynamic

	def get(key string) int

	def increment(siteId string)

	def isConcurrentWith(other Time) bool

	# For every key in other, take the maximum corresponding
	# value from self or other
	def takeMaximums(other Time)

	# Returns true if the values in each clock are all the same
	# (implicit values are counted as well, so { site1: 0 } is
	# considered equal to {})
	def equals(other Time) bool

	# return -1 if self < other
	# returns 1 if self > other
	# returns 0 if self.equals(other) or self.isConcurrentWith(other)
	def <=>(other Time) int
}
```

# Other implementations

I looked at a few other implementations before writing this.

- https://github.com/mixu/vectorclock
- https://github.com/AWinterman/vector-clock
- https://github.com/JosephMoniz/vector-clock
