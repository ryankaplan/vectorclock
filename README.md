# vectorclock.sk

This is a simple vector clock implementation written in [Skew](http://skew-lang.org/).
Skew is a language that compiles to Javascript and C#, and will soon compile to C++
too.

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

I looked at a few other implementations out of curiousity before writing this:

- https://github.com/mixu/vectorclock
- https://github.com/AWinterman/vector-clock
- https://github.com/JosephMoniz/vector-clock
